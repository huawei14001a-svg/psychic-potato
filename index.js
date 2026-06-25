# Явно указываем Node.js провайдер для Railway/Nixpacks
providers = ["node"]

[phases.setup]
nixPkgs = ["nodejs_20", "python3", "gcc", "gnumake"]

[phases.install]
cmds = ["npm install"]

[start]
cmd = "node index.js"
