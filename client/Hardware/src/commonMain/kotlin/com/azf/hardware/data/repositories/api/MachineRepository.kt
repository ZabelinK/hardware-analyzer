package com.azf.hardware.data.repositories.api

import com.azf.hardware.domain.statistics.models.machine.Machine

interface MachineRepository {
    var machine: Machine?
}