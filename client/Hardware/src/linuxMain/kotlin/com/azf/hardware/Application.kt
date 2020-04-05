package com.azf.hardware

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.data.repositories.impl.MachineRepositoryImpl
import com.azf.hardware.data.repositories.impl.StatisticsRepositoryImpl
import com.azf.hardware.domain.statistics.api.StatisticsInteractor
import com.azf.hardware.domain.statistics.impl.StatisticsInteractorImpl
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import io.ktor.client.HttpClient
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonConfiguration

class Application(private val statisticsInteractor: StatisticsInteractor) {

    var stop: Boolean = false

    suspend fun doWork() {
        println("doWork")
        val json = Json(JsonConfiguration.Stable)
        while (!stop) {
            withContext(Dispatchers.Default) {
                println("launch")
                kotlin.runCatching {
                    statisticsInteractor.collectAndSendStatistic()
                }.onFailure {
                    println("error: $it")
                }.onSuccess {
                    if (it != null) {
                        val jsonData = json.stringify(Statistic.serializer(), it)
                        println("success: $jsonData")
                    }
                }
            }
            println("SLEEP")
            delay(BuildKonfig.SYNC_PERIOD)
        }
    }

    companion object {
        fun buildApp(): Application {
            println("BUILD APP")
            val httpClient = HttpClient() {
                install(JsonFeature) {
                    serializer = KotlinxSerializer()
                }
            }
            val machineRepository = MachineRepositoryImpl(httpClient)
            val statisticsRepository = StatisticsRepositoryImpl(httpClient)
            return Application(
                StatisticsInteractorImpl(
                    machineRepository = machineRepository,
                    statisticsRepository = statisticsRepository
                )
            )
        }


    }
}

fun main() = runBlocking {
    Application.buildApp().doWork()
}

