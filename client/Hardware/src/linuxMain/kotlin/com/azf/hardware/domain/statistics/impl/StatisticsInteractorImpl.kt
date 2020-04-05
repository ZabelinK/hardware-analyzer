package com.azf.hardware.domain.statistics.impl

import com.azf.hardware.data.repositories.api.MachineRepository
import com.azf.hardware.data.repositories.api.StatisticsRepository
import com.azf.hardware.domain.statistics.api.StatisticsInteractor
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.refTo
import kotlinx.cinterop.toKString
import platform.posix.*


class StatisticsInteractorImpl(
    private val machineRepository: MachineRepository,
    private val statisticsRepository: StatisticsRepository
) : StatisticsInteractor {
    override suspend fun collectAndSendStatistic(): Statistic? {
        println("collect statistic ")
        val statistic = collectStatistic()
        println("start sending $statistic")
        val result = statisticsRepository.sendStatisticAsync(statistic)
        println("success stat sending : $result")
        return result
    }

    private suspend fun collectStatistic() = Statistic(
        id = 0,
        machine_id = machineRepository.fetchCurrentMachineInfo()?.id ?: 0,
        process = getProcCount(),
        memory_load = getMemoryLoad(),
        timestamp = time(null),
        cpu_load = getCpuLoad()
    )


    private fun getProcCount() = executeCommand("ps aux | wc -l").toInt()


    private fun getCpuLoad() =
        executeCommand("bash -c \"cat <(grep 'cpu ' /proc/stat) <(sleep 1 && grep 'cpu ' /proc/stat) | awk -v RS=\\\"\\\" '{print (\\\$13-\\\$2+\\\$15-\\\$4)*100/(\\\$13-\\\$2+\\\$15-\\\$4+\\\$16-\\\$5)}'\"")
            .replace(',', '.')
            .toDouble()
            .toInt()

    private fun getMemoryLoad() =
        executeCommand("free -m | awk 'NR==2{printf \"%.2f\\n\", \$3*100/\$2 }'").toDouble().toInt()

    private fun executeCommand(command: String): String {
        val fp: CPointer<FILE>? = popen(command, "r")
        val buffer = ByteArray(4096)
        val returnString = StringBuilder()

        /* Open the command for reading. */
        if (fp == NULL) {
            printf("Failed to run command\n")
            exit(1)
        }

        /* Read the output a line at a time - output it. */
        var scan = fgets(buffer.refTo(0), buffer.size, fp)
        if (scan != null) {
            while (scan != NULL) {
                returnString.append(scan!!.toKString())
                scan = fgets(buffer.refTo(0), buffer.size, fp)
            }
        }
        /* close */
        pclose(fp)
        return returnString.trim().toString()
    }

}