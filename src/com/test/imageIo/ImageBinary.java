package com.test.imageIo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import sun.misc.BASE64Decoder;

public class ImageBinary {
	
	static BASE64Decoder decoder = new sun.misc.BASE64Decoder();

	static void base64StringToImage(String base64String,String realUploadPath) {

		Calendar calendar = Calendar.getInstance();
		long imgName = calendar.getTime().getTime();
		try {
			byte[] bytes1 = decoder.decodeBuffer(base64String);
			 FileOutputStream os = new FileOutputStream(new File(realUploadPath+"/"+Long.toString(imgName)+".jpg"));  
			 os.write(bytes1);  
			 os.close();
//			 ByteArrayInputStream bais = new ByteArrayInputStream(bytes1);
//			 BufferedImage bi1 = ImageIO.read(bais);
//			 File w2 = new File(realUploadPath+"/"+Long.toString(imgName)+".png");//
//			 //File w2 = new File("f://2.png");// 可以是jpg,png,gif格式
//			 ImageIO.write(bi1, "jpg", w2);// 不管输出什么格式图片，此处不需改动
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			
		}
	}

}
