package com.azf.hardware.domain.statistics.api

import com.azf.hardware.domain.statistics.models.statistics.Statistic

interface StatisticsInteractor {
    suspend fun collectAndSendStatistic(): Statistic
}