package com.azf.hardware.domain.statistics

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import platform.posix.fclose
import platform.posix.fgets
import platform.posix.fopen
import platform.posix.perror


data class File(private val fileName: String) {
    fun read(): String? {
        val file = fopen(fileName, "r")
        if (file == null) {
            perror("cannot open input file $fileName")
            return null
        }

        val sb = StringBuilder();

        try {
            memScoped {
                val bufferLength = 64 * 1024
                val buffer = allocArray<ByteVar>(bufferLength)

                while (true) {
                    val nextLine = fgets(buffer, bufferLength, file)?.toKString()
                    if (nextLine == null || nextLine.isEmpty()) break
                    sb.append(nextLine)
                }
            }
        } finally {
            fclose(file)
        }
        return sb.toString();
    }
}