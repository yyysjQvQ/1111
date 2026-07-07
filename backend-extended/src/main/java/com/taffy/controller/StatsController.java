package com.taffy.controller;

import com.taffy.entity.LiveSession;
import com.taffy.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/overview")
    public Map<String, Object> getOverview(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> data = statsService.getOverview(userId);
        result.put("code", 200);
        result.put("data", data);
        return result;
    }

    @GetMapping("/live")
    public Map<String, Object> getLiveStats(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> data = statsService.getLiveStats(userId);
        result.put("code", 200);
        result.put("data", data);
        return result;
    }

    @GetMapping("/sessions")
    public Map<String, Object> getSessions(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Map<String, Object> result = new HashMap<>();
        List<LiveSession> sessions = statsService.getSessions(userId);
        result.put("code", 200);
        result.put("data", sessions);
        return result;
    }

    @PostMapping("/sessions")
    public Map<String, Object> startSession(@RequestBody Map<String, Object> body,
                                            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Map<String, Object> result = new HashMap<>();

        Long scriptId = body.get("scriptId") != null ?
                Long.valueOf(body.get("scriptId").toString()) : null;
        String platform = (String) body.get("platform");

        LiveSession session = statsService.startSession(userId, scriptId, platform);
        result.put("code", 200);
        result.put("message", "直播已开始");
        result.put("data", session);
        return result;
    }
}
