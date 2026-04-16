# gameicons

该目录用于存储游戏图标资源。

## 规范

- 图标文件建议使用清晰、统一的命名方式。
- 图标尺寸推荐不超过 `512x512`。
- 图标尺寸最小为 `128x128`。
- 图标必须为正方形，即宽高一致。
- 建议在新增图标时同步更新同目录下的 `info.json`。

## info.json 说明

`info.json` 用于维护图标信息，推荐字段如下：

- `name`: 图标文件名，例如 `minecraft` 默认会拼接`.png`。
- `author`: 作者名；如果没有单独作者信息，可直接写与 `name` 相同的值。

示例：

```json
{
  "icons": [
    {
      "name": "minecraft",
      "author": "minecraft"
    }
  ]
}
```
