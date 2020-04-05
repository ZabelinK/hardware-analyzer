package com.azf.hardware

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeoutOrNull
import kotlin.test.Test

private lateinit var application: Application

class ApplicationTest {

    @Test
    fun `test do work`() = runBlocking {
        val defaultStatistic = Statistic(
            id = 0,
            machine_id = 0,
            process = 0,
            memory_load = 0,
            timestamp = 0,
            cpu_load = 0
        )
        val statisticsInteractor = StatisticsInteractorMock(defaultStatistic)
        application = Application(statisticsInteractor)

        withTimeoutOrNull(BuildKonfig.SYNC_PERIOD * 3) {
            application.doWork()
        }


        assert(statisticsInteractor.callsCount in 1..3)

        return@runBlocking
    }

}