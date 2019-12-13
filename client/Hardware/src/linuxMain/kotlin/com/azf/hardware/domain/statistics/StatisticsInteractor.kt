package com.azf.hardware.domain.statistics

import com.azf.hardware.domain.models.statistics.Statistic

interface StatisticsInteractor {
    fun collectStatistic() : Statistic
}