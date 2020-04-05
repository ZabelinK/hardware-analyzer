package com.azf.hardware

import com.azf.hardware.data.repositories.api.MachineRepository
import com.azf.hardware.data.repositories.api.StatisticsRepository
import com.azf.hardware.domain.statistics.api.StatisticsInteractor
import com.azf.hardware.domain.statistics.models.machine.Machine
import com.azf.hardware.domain.statistics.models.statistics.Statistic

class StatisticsRepositoryMock(private val isFailed: Boolean) : StatisticsRepository {

    var sendStatisticAsyncResult: Statistic? = null

    override suspend fun sendStatisticAsync(statistic: Statistic): Statistic? {
        return if (isFailed) {
            null
        } else {
            sendStatisticAsyncResult = statistic
            statistic
        }
    }
}


class MachineRepositoryMock(private val mockResult: Machine?) : MachineRepository {
    override suspend fun fetchCurrentMachineInfo(): Machine? {
        return mockResult
    }
}

class StatisticsInteractorMock(private val mockResult: Statistic?) : StatisticsInteractor {

    var callsCount = 0

    override suspend fun collectAndSendStatistic(): Statistic? {
        callsCount++
        return mockResult
    }
}