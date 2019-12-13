package com.azf.hardware

import com.azf.hardware.domain.statistics.StatisticsInteractorImpl


fun main(args: Array<String>) {
    val statisticsInteractorImpl = StatisticsInteractorImpl()
    println("Statistic: ${statisticsInteractorImpl.collectStatistic()}")
    platform.posix.sleep(1)
    println("Statistic: ${statisticsInteractorImpl.collectStatistic()}")
    platform.posix.sleep(1)
    println("Statistic: ${statisticsInteractorImpl.collectStatistic()}")
}
