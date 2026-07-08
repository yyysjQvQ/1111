package com.taffy.controller;

import com.taffy.common.ApiResponse;
import com.taffy.dto.TtsConvertRequest;
import com.taffy.dto.TtsConvertResponse;
import com.taffy.entity.TtsTask;
import com.taffy.service.VoiceAiService;
import jakarta.validation.Valid;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/tts")
@CrossOrigin
public class TtsController {
    private final VoiceAiService voiceAiService;

    public TtsController(VoiceAiService voiceAiService) {
        this.voiceAiService = voiceAiService;
    }

    @PostMapping("/convert")
    public ApiResponse<TtsConvertResponse> convert(@Valid @RequestBody TtsConvertRequest request) throws Exception {
        return ApiResponse.ok(voiceAiService.convertTextToSpeech(request));
    }

    @GetMapping("/status/{taskId}")
    public ApiResponse<TtsTask> status(@PathVariable Long taskId) {
        return ApiResponse.ok(voiceAiService.getTaskStatus(taskId));
    }

    @GetMapping("/audio/{taskId}")
    public ResponseEntity<FileSystemResource> audio(@PathVariable Long taskId) {
        TtsTask task = voiceAiService.getTaskStatus(taskId);
        File file = new File(task.getAudioOutputPath());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new FileSystemResource(file));
    }
}
