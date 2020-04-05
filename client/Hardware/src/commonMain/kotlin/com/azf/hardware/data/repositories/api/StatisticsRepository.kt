package com.azf.hardware.data.repositories.api

import com.azf.hardware.domain.statistics.models.statistics.Statistic

interface StatisticsRepository {
    suspend fun sendStatisticAsync(statistic: Statistic): Statistic?
}