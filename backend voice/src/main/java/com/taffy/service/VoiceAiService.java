package com.taffy.service;

import com.taffy.dto.*;
import com.taffy.entity.TtsTask;

public interface VoiceAiService {
    VoiceTrainResponse trainVoice(VoiceTrainRequest request);
    TtsConvertResponse convertTextToSpeech(TtsConvertRequest request) throws Exception;
    TtsTask getTaskStatus(Long taskId);
}
