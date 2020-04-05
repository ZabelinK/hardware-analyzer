package com.azf.hardware.domain.statistics.impl

import com.azf.hardware.MachineRepositoryMock
import com.azf.hardware.StatisticsRepositoryMock
import com.azf.hardware.domain.statistics.api.StatisticsInteractor
import com.azf.hardware.domain.statistics.models.machine.Machine
import com.azf.hardware.domain.statistics.models.machine.MachineStatus
import kotlinx.coroutines.runBlocking
import kotlin.test.Test
import kotlin.test.assertEquals

class StatisticsInteractorImplTest {

    private lateinit var statisticsInteractor: StatisticsInteractor

    private val defaultMachine = Machine(0, "", MachineStatus.RUN)

    @Test
    fun `test post statistic succeed`() = runBlocking {

        val statisticsRepository = StatisticsRepositoryMock(false)
        statisticsInteractor = StatisticsInteractorImpl(
            machineRepository = MachineRepositoryMock(defaultMachine),
            statisticsRepository = statisticsRepository
        )
        assertEquals(statisticsInteractor.collectAndSendStatistic(), statisticsRepository.sendStatisticAsyncResult)

        return@runBlocking
    }

    @Test
    fun `test post statistic failed`() = runBlocking {

        val statisticsRepository = StatisticsRepositoryMock(true)
        statisticsInteractor = StatisticsInteractorImpl(
            machineRepository = MachineRepositoryMock(defaultMachine),
            statisticsRepository = statisticsRepository
        )
        assertEquals(statisticsInteractor.collectAndSendStatistic(), statisticsRepository.sendStatisticAsyncResult)

        return@runBlocking
    }

}