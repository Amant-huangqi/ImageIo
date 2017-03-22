package com.test.imageIo;

import net.coobird.thumbnailator.Thumbnails;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Service
public class ThumbnailService {
	public static final int WIDTH = 100;
	public static final int HEIGHT = 100;
	
	public String thumbnail(CommonsMultipartFile file,String uploadPath,String realUploadPath){
		
		try {
			String des = realUploadPath + "/thum" + file.getOriginalFilename();
			Thumbnails.of(file.getInputStream()).size(WIDTH, HEIGHT).toFile(des);//ËõÂÔÍ¼Éú³É
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return uploadPath + "/thum" + file.getOriginalFilename();
	}

}
