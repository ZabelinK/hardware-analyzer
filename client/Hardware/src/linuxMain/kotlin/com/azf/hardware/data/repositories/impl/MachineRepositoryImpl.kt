package com.azf.hardware.data.repositories.impl

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.data.repositories.api.MachineRepository
import com.azf.hardware.domain.statistics.files.File
import com.azf.hardware.domain.statistics.models.machine.Machine
import com.azf.hardware.domain.statistics.models.machine.MachineStatus
import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext

class MachineRepositoryImpl(private val httpClient: HttpClient) : MachineRepository {


    private var machineCache: Machine? = null

    private val mutex = Mutex()

    override suspend fun fetchCurrentMachineInfo(): Machine? {
        if (machineCache != null) {
            return machineCache
        } else {
            mutex.withLock {
                initMachineRepository()
                return machineCache
            }
        }
    }

    private fun getMachineIdFromFile(): String = File(
        MACHINE_ID_FILE_PATH
    ).read()?.trim() ?: "UNKNOWN"

    private suspend fun initMachineRepository() {
        withContext(Dispatchers.Default) {
            val machines = async { requestAllMachinesAsync() }
            val machineId = getMachineIdFromFile()
            val machineFromServer = machines.await()?.firstOrNull { it.name == machineId }
            machineCache = machineFromServer ?: postNewMachineAsync(machineId, MachineStatus.RUN)
            println("inited machine")
        }
    }

    private suspend fun postNewMachineAsync(
        machineId: String = "UNKNOWN",
        machineStatus: MachineStatus = MachineStatus.FAILED
    ): Machine? {
        println("POST NEW MACHINE: $machineId")

        return kotlin.runCatching {
            httpClient.post<Machine> {
                url(API_URL)
                contentType(ContentType.Application.Json)
                body = Machine(0, machineId, machineStatus)
            }

        }.onFailure {
            println("Post new machine exception: $it")
        }.onSuccess {
            println("machine $it")
        }.getOrThrow()
    }

    private suspend fun requestAllMachinesAsync() = kotlin.runCatching {
        httpClient.get<List<Machine>>(API_URL)
    }.getOrNull()


    companion object {
        val API_URL = "${BuildKonfig.BACKEND_API_PATH}/machine"
        const val MACHINE_ID_FILE_PATH = "/etc/machine-id"
    }
}
