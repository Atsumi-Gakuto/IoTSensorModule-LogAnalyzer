# IoTSensorModule-LogAnalyzer
[IoTセンサモジュール](https://github.com/Pluslab/iot-sensor-module)のログ出力を解析し、Si1132のコマンドエラーが発生した時間を可視化するツールです。

## 使用方法
[こちら](https://atsumi-gakuto.github.io/IoTSensorModule-LogAnalyzer/iot_sensor_module_log_analyzer.html)からツールを開きます。ログ入力の欄にログファイル（`.log`）を入力すると、自動的に結果が出力されます。

## ログファイルについて
ここで指す「ログ」とは、[TeraTerm](https://forest.watch.impress.co.jp/library/software/utf8teraterm/)を通じて出力されるログを指します。ログは「ファイル」→「ログ...」から設定し、記録する事が出来ます。ログにはローカルタイムでタイムスタンプを付ける必要があります。想定しているログ形式の例は以下の通りです。

```log
[2023-11-10 15:18:06.539] counter = 0, 5 seconds elapsed
[2023-11-10 15:18:11.637] counter = 1, 10 seconds elapsed
[2023-11-10 15:18:16.735] counter = 2, 15 seconds elapsed
[2023-11-10 15:18:21.849] counter = 3, 20 seconds elapsed
[2023-11-10 15:18:26.932] counter = 4, 25 seconds elapsed
```

このツールは`Si1132 command error`とログ出力されるとSi1132のエラーとして記録されます。