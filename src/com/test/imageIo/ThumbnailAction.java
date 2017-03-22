package com.test.imageIo;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class ThumbnailAction {
	
	private UploadService uploadService;
	
	//private ThumbnailService thumbnailService;
	
	
	@RequestMapping(value="/thumbnail",method=RequestMethod.POST)
	public ModelAndView thumbnail(@RequestParam("image")CommonsMultipartFile file,HttpSession session){
		
		String uploadPath = "/images/ori_img";
		String realUploadPath = session.getServletContext().getRealPath(uploadPath);//绝对路径
		
		
		String imageUrl = uploadService.uploadImage(file, uploadPath, realUploadPath);//图片上传
		//String thumImageUrl = thumbnailService.thumbnail(file, uploadPath, realUploadPath);//缩略图的生成
		
		
		ModelAndView ret = new ModelAndView();
		ret.addObject("imageURL",imageUrl);
		//ret.addObject("thumImageUrl", thumImageUrl);
		
		ret.setViewName("thumbnail");
		
		return ret;
		
	}
	
//	@RequestMapping(value="/thumbnail_2",method=RequestMethod.POST)
//	@ResponseBody
//	public String thumbnail_2(@RequestParam("image")String imgBase,HttpSession session){
//		String uploadPath = "/images/dw_img";
//		System.out.print(imgBase);
//		String realUploadPath = session.getServletContext().getRealPath(uploadPath);//绝对路径
//		ImageBinary.base64StringToImage(imgBase, realUploadPath);
//		
//		return "OK";
//		
//	}
//	
	@RequestMapping(value="/thumbnail_2",method=RequestMethod.POST)
	@ResponseBody
	public String thumbnail_2(HttpServletRequest req,HttpSession session){
		StringBuffer buffer = null;
		try {
			BufferedReader reader = req.getReader();
			  buffer = new StringBuffer();
			  String string=null;
			  while ((string = reader.readLine()) != null) {
			   buffer.append(string);
			  }
			  reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		
		String uploadPath = "/images/dw_img";
		String imgBase = buffer.toString().substring(1, buffer.length()-1);
		//System.out.print(imgBase);
		String realUploadPath = session.getServletContext().getRealPath(uploadPath);//绝对路径
		ImageBinary.base64StringToImage(imgBase, realUploadPath);
		
		return "OK";
		
	}
	
	

	@Autowired
	public void setUploadService(UploadService uploadService) {
		this.uploadService = uploadService;
	}

//	@Autowired
//	public void setThumbnailService(ThumbnailService thumbnailService) {
//		this.thumbnailService = thumbnailService;
//	}
	
	

}
