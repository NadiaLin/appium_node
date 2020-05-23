const host = {
    host: '127.0.0.1',
    port: 4723
    };

const desiredCaps = {
    platformName: "Android",
    deviceName: "Android Emulator",
    app: "/path to/appium_node/app/app-debug.apk",
    browserName: '',
    noReset: false
    };

module.exports = {host, desiredCaps};