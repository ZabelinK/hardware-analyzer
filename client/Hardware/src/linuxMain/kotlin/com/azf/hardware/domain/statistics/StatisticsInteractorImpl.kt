package com.azf.hardware.domain.statistics

import com.azf.hardware.domain.models.statistics.Statistic
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.refTo
import kotlinx.cinterop.toKString
import platform.posix.*
import kotlin.system.getTimeMillis


class StatisticsInteractorImpl : StatisticsInteractor {
    override fun collectStatistic(): Statistic {
        //TODO replace it
        //val client = HttpClient()
        return Statistic(getMachineId(), getProcCount(), getCpuLoad(), getMemoryLoad(), getTimeMillis())
    }

    fun getMachineId(): String = File("/etc/machine-id").read() ?: "Unknown"

    fun getProcCount() = executeCommand("ps aux | wc -l").toInt()

    fun getCpuLoad() =
        executeCommand("mpstat -P ALL 1 1 | awk '/Average:/ && \$2 ~ /[0-9]/ {print \$3}'")
            .split('\n')
            .map {
                it.replace(',','.').toDouble() }
            .average()
            .toInt()

    fun getMemoryLoad() = executeCommand("free -m | awk 'NR==2{printf \"%.2f\\n\", \$3*100/\$2 }'\n").toDouble().toInt()

    fun executeCommand(command: String): String {
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