package com.taffy.controller;

import com.taffy.common.ApiResponse;
import com.taffy.dto.VoiceTrainRequest;
import com.taffy.dto.VoiceTrainResponse;
import com.taffy.service.VoiceAiService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voice")
@CrossOrigin
public class VoiceTrainController {
    private final VoiceAiService voiceAiService;

    public VoiceTrainController(VoiceAiService voiceAiService) {
        this.voiceAiService = voiceAiService;
    }

    @PostMapping("/train")
    public ApiResponse<VoiceTrainResponse> train(@Valid @RequestBody VoiceTrainRequest request) {
        return ApiResponse.ok(voiceAiService.trainVoice(request));
    }
}
