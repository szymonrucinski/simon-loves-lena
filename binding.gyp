{
    "targets": [
        {
            "target_name": "improc",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": [
                "./cpp/part1/part1.cpp",
                "./cpp/part1/index1.cpp"
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
