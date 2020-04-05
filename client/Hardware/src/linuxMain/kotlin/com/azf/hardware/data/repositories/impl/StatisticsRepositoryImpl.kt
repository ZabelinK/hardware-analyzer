package com.azf.hardware.data.repositories.impl

import com.azf.hardware.build.BuildKonfig
import com.azf.hardware.data.repositories.api.StatisticsRepository
import com.azf.hardware.domain.statistics.models.statistics.Statistic
import io.ktor.client.HttpClient
import io.ktor.client.request.post
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class StatisticsRepositoryImpl(private val httpClient: HttpClient) : StatisticsRepository {

    override suspend fun sendStatisticAsync(statistic: Statistic) = withContext(Dispatchers.Default) {
        println("async sending")
        kotlin.runCatching {
            httpClient.postStatistic(statistic)
        }.onFailure {
            println("exception: $httpClient")
        }.getOrNull()

    }

    private suspend fun HttpClient.postStatistic(statistic: Statistic): Statistic {
        return post {
            url("$API_URL?machine=${statistic.machine_id} ")
            contentType(ContentType.Application.Json)
            body = statistic
        }
    }

    companion object {
        val API_URL = "${BuildKonfig.BACKEND_API_PATH}/statistic"
        const val QUERY_MACHINE = "machine"
    }
}