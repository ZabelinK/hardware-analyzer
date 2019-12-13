package com.azf.hardware.domain.models.statistics


data class Statistic(
    val machineId: String,
    val process: Int,
    val cpuLoad: Int,
    val memoryLoad: Int,
    val timestamp: Long
)