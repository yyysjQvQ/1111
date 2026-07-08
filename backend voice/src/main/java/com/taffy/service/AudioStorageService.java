package com.taffy.service;

import org.springframework.web.multipart.MultipartFile;

public interface AudioStorageService {
    String saveAudio(MultipartFile file, Long userId) throws Exception;
}
