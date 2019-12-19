package com.azf.hardware

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.domain.statistics.impl.StatisticsInteractorImpl
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonConfiguration
import platform.posix.sleep

fun main() = runBlocking {
    coroutineScope {
        val statisticsInteractor = StatisticsInteractorImpl()
        val json = Json(JsonConfiguration.Stable)
        while (true) {
            async {
                kotlin.runCatching {
                    val statistic = statisticsInteractor.collectAndSendStatistic()
                    val jsonData = json.stringify(Statistic.serializer(), statistic)
                    println(jsonData)
                }
            }.await()
            println("SLEEP")
            sleep(BuildKonfig.SYNC_PERIOD.toUInt())
        }
    }
}
