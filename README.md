# M3U Player

A modern web-based M3U playlist player built with Next.js that supports multiple video player backends and provides a clean, responsive interface for streaming content from M3U playlists.

## Features

- **Multiple Player Support**: Choose between three different video player implementations:
  - HLS.js - Lightweight HTML5 video player with HLS support
  - ArtPlayer - Feature-rich video player with advanced controls
  - Plyr - Clean, accessible HTML5 media player

- **M3U Playlist Support**: Load and parse M3U/M3U8 playlists from URLs
  - Supports standard M3U format with extended information tags
  - Handles channel metadata including logos, group titles, and names

- **Responsive Design**: Optimized for both desktop and mobile viewing experiences
  - Flexible layout that adapts to different screen sizes
  - Sidebar playlist on larger screens, collapsible on mobile

- **Playlist Management**:
  - Search functionality to quickly find channels
  - Recently played history for quick access to favorite channels
  - Persistent playlist URL storage between sessions

- **DRM Support**: Handles various DRM key formats found in M3U playlists

## Technology Stack

- **Framework**: Next.js 15.2.1
- **UI**: React 19 with Tailwind CSS 4
- **Video Players**:
  - HLS.js for HLS streaming
  - ArtPlayer for advanced playback features
  - Plyr for a clean, minimalist player experience
- **TypeScript**: Fully typed codebase for better development experience

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/m3u-player.git
cd m3u-player
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Usage

1. Enter an M3U playlist URL in the input field and click "Go"
2. Browse the loaded channels in the playlist sidebar
3. Click on a channel to start playback
4. Switch between different player backends using the buttons above the video player
5. Use the search bar to filter channels by name or group

## Project Structure

- `/app`: Next.js app directory containing the main page and layout
- `/components`: React components for the UI
- `/types`: TypeScript type definitions
- `/utils`: Utility functions including the M3U parser
- `/public`: Static assets

## License

This project is open source and available under the [MIT License](LICENSE).

---

# M3U 播放器

一个基于 Next.js 构建的现代化网页 M3U 播放列表播放器，支持多种视频播放器后端，为从 M3U 播放列表流式传输内容提供了清晰、响应式的界面。

## 功能特点

- **多播放器支持**：可选择三种不同的视频播放器实现：
  - HLS.js - 轻量级 HTML5 视频播放器，支持 HLS
  - ArtPlayer - 功能丰富的视频播放器，具有高级控制功能
  - Plyr - 简洁、易用的 HTML5 媒体播放器

- **M3U 播放列表支持**：从 URL 加载和解析 M3U/M3U8 播放列表
  - 支持带有扩展信息标签的标准 M3U 格式
  - 处理频道元数据，包括徽标、分组标题和名称

- **响应式设计**：针对桌面和移动设备观看体验进行了优化
  - 适应不同屏幕尺寸的灵活布局
  - 在大屏幕上显示侧边栏播放列表，在移动设备上可折叠

- **播放列表管理**：
  - 搜索功能，快速查找频道
  - 最近播放历史记录，快速访问喜爱的频道
  - 会话之间持久保存播放列表 URL

- **DRM 支持**：处理 M3U 播放列表中的各种 DRM 密钥格式

## 技术栈

- **框架**：Next.js 15.2.1
- **UI**：React 19 与 Tailwind CSS 4
- **视频播放器**：
  - HLS.js 用于 HLS 流媒体
  - ArtPlayer 用于高级播放功能
  - Plyr 用于简洁、极简的播放器体验
- **TypeScript**：完全类型化的代码库，提供更好的开发体验

## 开始使用

### 前提条件

- Node.js（推荐 v18 或更高版本）
- npm 或 yarn

### 安装

1. 克隆仓库
```bash
git clone https://github.com/yourusername/m3u-player.git
cd m3u-player
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 生产环境构建

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 使用方法

1. 在输入字段中输入 M3U 播放列表 URL，然后点击"Go"
2. 在播放列表侧边栏中浏览加载的频道
3. 点击频道开始播放
4. 使用视频播放器上方的按钮切换不同的播放器后端
5. 使用搜索栏按名称或分组筛选频道

## 项目结构

- `/app`：Next.js 应用目录，包含主页和布局
- `/components`：UI 的 React 组件
- `/types`：TypeScript 类型定义
- `/utils`：实用工具函数，包括 M3U 解析器
- `/public`：静态资源

## 许可证

本项目是开源的，可在 [MIT 许可证](LICENSE) 下使用。
