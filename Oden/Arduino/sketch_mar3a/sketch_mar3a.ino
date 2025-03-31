const int buttonPin = 2;  // 按钮连接到 D2
int lastState = HIGH;

void setup() {
    pinMode(buttonPin, INPUT_PULLUP);  // 使用内部上拉电阻
    Serial.begin(9600);  // 启动串口通信
}

void loop() {
    int state = digitalRead(buttonPin);
    if (state == LOW && lastState == HIGH) {  // 检测按下
        Serial.println("Pressed");  // 发送信号到电脑
        delay(200);  // 消抖
    }
    lastState = state;
}
