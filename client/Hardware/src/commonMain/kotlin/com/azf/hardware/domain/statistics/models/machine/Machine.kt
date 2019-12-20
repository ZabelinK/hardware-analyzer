package com.azf.hardware.domain.statistics.models.machine

import kotlinx.serialization.Serializable

@Serializable
data class Machine(val id: Int = 0, val name: String, val status: MachineStatus)