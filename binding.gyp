{
    "targets": [
        {
            "target_name": "greet",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": [
                "./src/greeting.cpp",
                "./src/index.cpp"
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            # 'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
            "conditions": [
                [
                    "OS==\"mac\"", {
                        "xcode_settings": {
                            "OTHER_CFLAGS": [
                                "-mmacosx-version-min=10.7",
                                "-std=c++11",
                                "-stdlib=libc++"
                            ],
                            "GCC_ENABLE_CPP_RTTI": "YES",
                            "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
                        }
                    }
                ]
            ]
        }
    ]
}
