package com.azf.hardware.domain.statistics.models.statistics

import kotlinx.serialization.Serializable

@Serializable
data class Statistic(
    val id: Int = 0,
    val machine_id: Int,
    val process: Int,
    val cpu_load: Int,
    val memory_load: Int,
    val timestamp: Long
)