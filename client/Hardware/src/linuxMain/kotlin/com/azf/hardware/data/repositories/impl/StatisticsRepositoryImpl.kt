package com.azf.hardware.data.repositories.impl

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.data.repositories.api.StatisticsRepository
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import io.ktor.client.HttpClient
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.client.request.post
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope

class StatisticsRepositoryImpl : StatisticsRepository {

    override suspend fun sendStatisticAsync(statistic: Statistic) = coroutineScope<Deferred<Statistic?>> {
        async {
            println("async sending")
            val client = buildHttpClient()

            val result = client.post<Statistic> {
                url("$API_URL?machine=${statistic.machine_id} ")
                contentType(ContentType.Application.Json)
                body = statistic
            }

            client.close()
            result
        }
    }

    private fun buildHttpClient(): HttpClient {
        return HttpClient() {
            install(JsonFeature) {
                serializer = KotlinxSerializer().apply {
                    register(Statistic.serializer())
                }
            }
        }
    }

    companion object {
        val API_URL = "${BuildKonfig.BACKEND_API_PATH}/statistic"
        const val QUERY_MACHINE = "machine"
    }
}