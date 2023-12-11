import '@/app/styles.css';
import './tools.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/header/header.js';
import ToolContainer from '@/components/tool-container/toolContainer';
import WordAssistantSVG from '@/components/icons/wordAssistantSVG';
import ImageEditorSVG from '@/components/icons/imageEditorSVG';
import TypingSpeedSVG from '@/components/icons/typingSpeedSVG';
import APITesterSVG from '@/components/icons/apiTesterSVG';
import WorldClockSVG from '@/components/icons/worldClockSVG';
import DailyAffirmationSVG from '@/components/icons/dailyAffirmationSVG';

export default function Tools() {
  return (
    <>
      <Head>
        <title>CAA - Tools</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <h1>Tools</h1>
        <div className="tools">
            <ToolContainer
                SvgComponent={WordAssistantSVG}
                title="Word Assistant"
                linkHref="tools/word-assistant"
            />
            <ToolContainer
                SvgComponent={ImageEditorSVG}
                title="Image Editor"
                linkHref="tools/image-editor"
            />
            <ToolContainer
                SvgComponent={TypingSpeedSVG}
                title="Typing Speed Test"
                linkHref="tools/typing-speed-test"
            />
            <ToolContainer
                SvgComponent={APITesterSVG}
                title="API Tester"
                linkHref="tools/api-tester"
            />
            <ToolContainer
                SvgComponent={WorldClockSVG}
                title="World Clock"
                linkHref="tools/world-clock"
            />
            <ToolContainer
                SvgComponent={DailyAffirmationSVG}
                title="Daily Affirmation Generator"
                linkHref="tools/daily-affirmation"
            />
        </div>
      </div>
    </>
  );
}