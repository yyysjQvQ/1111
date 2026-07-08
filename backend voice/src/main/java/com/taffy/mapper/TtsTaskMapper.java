package com.taffy.mapper;

import com.taffy.entity.TtsTask;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TtsTaskMapper {
    int insert(TtsTask task);
    TtsTask findById(@Param("id") Long id);
    int updateStatusAndOutput(@Param("id") Long id, @Param("status") String status, @Param("audioOutputPath") String audioOutputPath);
}
