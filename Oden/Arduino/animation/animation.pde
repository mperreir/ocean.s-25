//processing p5
import processing.serial.*;  // 串口库
import processing.video.*;   // 视频库

Serial myPort;               // 串口对象
boolean showAnimation = false;  // 控制动画的变量
Movie myMovie;  // 视频对象

void setup() {
  fullScreen();  // 设置全屏模式
  myMovie = new Movie(this, "10s.mp4");// 载入视频 (MP4 文件放在 `data` 目录下)
  String portName = "COM16";  // 连接 Arduino 的串口 (如 "COM3" 或 "/dev/ttyUSB0")
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  background(0);  // 黑色背景
  if (showAnimation) // 如果收到按钮信号，播放动画
  {
    if (!myMovie.isPlaying()) //如果没视频在播放
    {
      myMovie.play();  // 播放视频
    }
    image(myMovie, 0, 0, width, height);  // 让视频填充整个屏幕
    if (myMovie.time() >= myMovie.duration() - 0.1) {
      showAnimation = false;  // 让 draw() 重新回到黑屏状态
      myMovie.stop();         // 停止视频
    }
  }
}
// 监听串口数据
void serialEvent(Serial p) {
  String inString = p.readStringUntil('\n');
  if (inString != null) {
    inString = trim(inString);  // 去除空格和换行
    if (inString.equals("Pressed")) {
      showAnimation = true; 
    }
  }
}
void movieEvent(Movie m) {// 让 Processing 正确播放视频
  m.read();
}
