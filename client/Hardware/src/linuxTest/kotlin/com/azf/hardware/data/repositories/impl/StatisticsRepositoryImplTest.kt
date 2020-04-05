package com.azf.hardware.data.repositories.impl

import com.azf.hardware.data.repositories.api.StatisticsRepository
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import io.ktor.client.HttpClient
import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.respond
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.http.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonConfiguration
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull


class StatisticsRepositoryImplTest {

    private lateinit var statisticsRepository: StatisticsRepository

    private val json = Json(JsonConfiguration.Stable)

    private val defaultStatistic = Statistic(
        id = 0,
        machine_id = 0,
        process = 0,
        memory_load = 0,
        timestamp = 0,
        cpu_load = 0
    )

    @Test
    fun `test post statistic succeed`() = runBlocking {

        val httpClient = HttpClient(MockEngine) {
            install(JsonFeature) {
                serializer = KotlinxSerializer()
            }
            engine {
                addHandler { request ->
                    if (request.method == HttpMethod.Post && request.url.fullUrl == "${StatisticsRepositoryImpl.API_URL}?machine=${defaultStatistic.machine_id}") {
                        val responseHeaders =
                            headersOf("Content-Type" to listOf(ContentType.Application.Json.toString()))
                        val result = json.stringify(Statistic.serializer(), defaultStatistic)
                        respond(result, headers = responseHeaders)
                    } else {
                        error("Unhandled ${request.url.fullUrl}")
                    }

                }
            }
        }

        statisticsRepository = StatisticsRepositoryImpl(httpClient)
        assertEquals(defaultStatistic, statisticsRepository.sendStatisticAsync(defaultStatistic))
    }


    @Test
    fun `test post statistic failed`() = runBlocking {

        val httpClient = HttpClient(MockEngine) {
            install(JsonFeature) {
                serializer = KotlinxSerializer()
            }
            engine { addHandler { request -> error("Unhandled ${request.url.fullUrl}") } }
        }

        statisticsRepository = StatisticsRepositoryImpl(httpClient)
        assertNull(statisticsRepository.sendStatisticAsync(defaultStatistic))
    }


    private val Url.hostWithPortIfRequired: String get() = if (port == protocol.defaultPort) host else hostWithPort
    private val Url.fullUrl: String get() = "${protocol.name}://$hostWithPortIfRequired$fullPath"
}

