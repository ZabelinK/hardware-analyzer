package com.azf.hardware.data.repositories.impl

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.data.repositories.api.MachineRepository
import com.azf.hardware.domain.statistics.files.File
import com.azf.hardware.domain.statistics.models.machine.Machine
import com.azf.hardware.domain.statistics.models.machine.MachineStatus
import io.ktor.client.HttpClient
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.list

class MachineRepositoryImpl : MachineRepository {

    private var isInit: Boolean = false

    override var machine: Machine? = null

    init {
        initMachineRepository()
    }

    private fun getMachineIdFromFile(): String = File(
        MACHINE_ID_FILE_PATH
    ).read()?.trim() ?: "UNKNOWN"

    private fun initMachineRepository() {
        if (isInit) return

        runBlocking {
            val machines = requestAllMachinesAsync()
            val machineId = getMachineIdFromFile()
            val machineFromServer = machines.await()?.firstOrNull { it.name == machineId }
            machine = machineFromServer ?: postNewMachineAsync(machineId, MachineStatus.RUN).await()
            isInit = true
            println("inited machine")
        }
    }

    private suspend fun postNewMachineAsync(
        machineId: String = "UNKNOWN",
        machineStatus: MachineStatus = MachineStatus.FAILED
    ): Deferred<Machine?> {
        return coroutineScope<Deferred<Machine?>> {
            async {
                println("POST NEW MACHINE: $machineId")
                val client = buildHttpClient()
                val result = kotlin.runCatching {
                    client.post<Machine> {
                        url(API_URL)
                        contentType(ContentType.Application.Json)
                        body = Machine(0, machineId, machineStatus)
                    }
                }.getOrNull()
                client.close()
                result
            }
        }
    }

    private suspend fun requestAllMachinesAsync() = coroutineScope {
        async {
            println("start async")
            val client = buildHttpClient()
            val result = kotlin.runCatching {
                client.get<List<Machine>>(API_URL)
            }.getOrNull()

            println("result: $result")
            client.close()

            result
        }
    }

    private fun buildHttpClient(): HttpClient {
        println("BUILD MACHINE")
        return HttpClient() {
            install(JsonFeature) {
                serializer = KotlinxSerializer().apply {
                    register(Machine.serializer().list)
                }
            }
        }
    }

    companion object {
        val API_URL = "${BuildKonfig.BACKEND_API_PATH}/machine"
        const val MACHINE_ID_FILE_PATH = "/etc/machine-id"
    }
}
