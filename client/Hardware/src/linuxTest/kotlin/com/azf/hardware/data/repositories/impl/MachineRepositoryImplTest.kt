package com.azf.hardware.data.repositories.impl

import com.azf.hardware.data.repositories.api.MachineRepository
import com.azf.hardware.data.repositories.impl.MachineRepositoryImpl.Companion.API_URL
import com.azf.hardware.data.repositories.impl.MachineRepositoryImpl.Companion.MACHINE_ID_FILE_PATH
import com.azf.hardware.domain.statistics.files.File
import com.azf.hardware.domain.statistics.models.machine.Machine
import com.azf.hardware.domain.statistics.models.machine.MachineStatus
import io.ktor.client.HttpClient
import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.respond
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.http.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.builtins.list
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonConfiguration
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails

class MachineRepositoryImplTest {

    private lateinit var machineRepository: MachineRepository
    private val json = Json(JsonConfiguration.Stable)

    @Test
    fun `test register machine`() = runBlocking {

        val defaultMachine = Machine(0, "", MachineStatus.RUN)

        val httpClient = HttpClient(MockEngine) {
            install(JsonFeature) {
                serializer = KotlinxSerializer()
            }
            engine {
                addHandler { request ->
                    println(API_URL)
                    if (request.method == HttpMethod.Get && request.url.fullUrl == API_URL) {
                        val responseHeaders =
                            headersOf("Content-Type" to listOf(ContentType.Application.Json.toString()))
                        val result = json.stringify(Machine.serializer().list, emptyList())
                        respond(result, headers = responseHeaders)
                    } else if (request.method == HttpMethod.Post && request.url.fullUrl == API_URL) {
                        val responseHeaders =
                            headersOf("Content-Type" to listOf(ContentType.Application.Json.toString()))
                        val result = json.stringify(Machine.serializer(), defaultMachine)
                        respond(result, headers = responseHeaders)
                    } else {
                        error("Unhandled ${request.url.fullUrl}")
                    }

                }
            }
        }

        machineRepository = MachineRepositoryImpl(httpClient)
        assertEquals(defaultMachine, machineRepository.fetchCurrentMachineInfo())
    }

    @Test
    fun `test fetch already registered machine data`() = runBlocking {

        val defaultMachine = Machine(0, File(MACHINE_ID_FILE_PATH).read()?.trim() ?: "UNKNOWN", MachineStatus.RUN)

        val httpClient = HttpClient(MockEngine) {
            install(JsonFeature) {
                serializer = KotlinxSerializer()
            }
            engine {
                addHandler { request ->
                    println(API_URL)
                    if (request.method == HttpMethod.Get && request.url.fullUrl == API_URL) {
                        val responseHeaders =
                            headersOf("Content-Type" to listOf(ContentType.Application.Json.toString()))
                        val result = json.stringify(Machine.serializer().list, listOf(defaultMachine))
                        respond(result, headers = responseHeaders)
                    } else {
                        error("Unhandled ${request.url.fullUrl}")
                    }

                }
            }
        }


        machineRepository = MachineRepositoryImpl(httpClient)
        assertEquals(defaultMachine, machineRepository.fetchCurrentMachineInfo())
    }

    @Test
    fun `test server error exception`() = runBlocking {

        val httpClient = HttpClient(MockEngine) {
            install(JsonFeature) {
                serializer = KotlinxSerializer()
            }
            engine { addHandler { request -> error("Unhandled ${request.url.fullUrl}") } }
        }



        machineRepository = MachineRepositoryImpl(httpClient)
        assertFails {
            machineRepository.fetchCurrentMachineInfo()
        }

        return@runBlocking
    }

    private val Url.hostWithPortIfRequired: String get() = if (port == protocol.defaultPort) host else hostWithPort
    private val Url.fullUrl: String get() = "${protocol.name}://$hostWithPortIfRequired$fullPath"
}