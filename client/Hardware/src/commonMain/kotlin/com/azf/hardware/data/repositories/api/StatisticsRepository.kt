package com.azf.hardware.data.repositories.api

import com.azf.hardware.domain.statistics.models.statistics.Statistic
import kotlinx.coroutines.Deferred

interface StatisticsRepository {
    suspend fun sendStatisticAsync(statistic: Statistic): Deferred<Statistic?>
}