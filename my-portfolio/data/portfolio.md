# 作品集

## 作品一：智能家居网关

![智能家居网关](../portfolio/gateway.jpg)

基于 ESP32 的智能家居网关，支持 WiFi/BLE 双模通信，
集成 MQTT 协议对接 Home Assistant。

- **硬件：** ESP32-WROOM-32 · 板载天线 · USB-UART 调试口
- **固件：** ESP-IDF v4.4 · FreeRTOS · MQTT Client
- **特点：** 低功耗休眠模式 · OTA 远程升级

---

## 作品二：手持数据采集仪

![手持数据采集仪](../portfolio/daq.jpg)

便携式数据采集终端，用于工业现场传感器数据记录。

- **硬件：** STM32F407 · 2.8" TFT 触摸屏 · SD 卡存储
- **固件：** STM32 HAL · FatFS · USB MSC
- **上位机：** Python PyQt5 数据分析与图表显示

---

## 作品三：电机控制驱动器

![电机控制驱动器](../portfolio/motor_driver.jpg)

FOC 无刷直流电机驱动器，用于机器人关节控制。

- **硬件：** STM32G431 · 三相逆变桥 · 霍尔/编码器接口
- **固件：** 双环 PID（速度环 + 电流环）· SVPWM
- **性能：** 转速闭环精度 ±1 RPM · 20kHz 开关频率

---

## 作品四：RISC-V 开发板实验

![RISC-V 开发板](../portfolio/riscv_board.jpg)

在国产 RISC-V 开发板上移植 Zephyr RTOS 并验证外设驱动。

- **平台：** CH32V307 (沁恒)
- **系统：** Zephyr RTOS
- **外设：** GPIO · UART · SPI · ADC · PWM
- **成果：** 提交 3 个驱动补丁到上游社区

---

> 💡 **提示：** 将作品的实物照片放入 `portfolio/` 文件夹，
> 文件名与上面 `![描述](../portfolio/xxx.jpg)` 中的路径一致即可自动显示。
> 支持 JPG / PNG / WebP 格式。
