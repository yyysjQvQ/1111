package com.taffy.service;

import com.taffy.dto.TtsConvertRequest;

public interface TtsProvider {
    byte[] synthesize(TtsConvertRequest request, String voiceParams) throws Exception;
}
