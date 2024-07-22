import React, { useState } from 'react';
import { useEffect } from 'react';
import Markdown from ".//components/Markdown";
import AvatarComponent from ".//components/Avatar";
import './styles.css';
import nailong from './images/nailong.jpg';
import wenxin from './images/wenxin.png';

function App() {
    useEffect(() => {
        document.title = "奶龙机器人beta"; // 设置窗口标题为"My App"
    }, []);

    // 使用useState Hook来管理textarea的值和从后端接收到的响应  
    const [inputValue, setInputValue] = useState('');
    const [responseText, setResponseText] = useState('请输入内容...');
    const [array, setArray] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    // 事件处理函数，用于更新textarea的值  
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    // 事件处理函数，用于发送数据到后端并处理响应  
    const sendDataToBackend = async () => {
        try {
            setResponseText('响应中...');
            setInputValue("");
            // 发送POST请求到Flask后端  
            const response = await fetch('/api/counter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history: array, content: inputValue, model: selectedOption }),
            }).then(response => {
                const reader = response.body.getReader();
                let receivedData = '';
                function read() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            return;
                        }
                        receivedData += new TextDecoder().decode(value);
                        setArray([...array, { "content": inputValue, "avatar": nailong, "name": "奇迹龙龙" }, { "content": receivedData || '未收到有效响应', "avatar": wenxin, "name": "ERNIE" }]);
                        scrollToBottom();
                        return read();  // 递归调用以继续读取流数据
                    });
                }
                return read();
            }).catch(error => console.error('Error:', error));
            // 更新响应文本状态  
            setResponseText('收到有效响应');
        } catch (error) {
            // 处理请求错误  
            console.error('请求失败:', error);
            setResponseText('请求失败');
        }
    };

    const scrollToBottom = () => {
        const textsDiv = document.querySelector('.texts');
        if (textsDiv) {
            textsDiv.scrollTop = textsDiv.scrollHeight;
        }
    };

    const clearData = async () => {
        setArray([]);
    };



    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (

        <div className="container">
            <div className="model-selector">
                <div className="select-container">
                    <select onChange={handleSelectChange} className="your-select-class">
                        <option value="未选择, 默认ERNIE-Lite-8K-0922(免费)">请选择...</option>
                        <option value="ERNIE-Lite-8K-0922">ERNIE-Lite-8K-0922(免费)</option>
                        <option value="ERNIE-4.0-Turbo-8K">ERNIE-4.0-Turbo-8K</option>
                        <option value="ERNIE-4.0-8K">ERNIE-4.0-8K</option>
                        <option value="ERNIE-3.5-8K">ERNIE-3.5-8K</option>
                        {/* 更多选项... */}
                    </select>
                </div>
                <p id="selectedText" className="selected-text">
                    当前模型：{selectedOption ? selectedOption : '未选择, 默认ERNIE-Lite-8K-0922(免费)'}
                </p>
            </div>
            <div className='texts'>
                {array.map((item, index) => (
                    <div className='message-container'>
                        <AvatarComponent name={item.name} avatarUrl={item.avatar} />
                        <Markdown key={index} content={item.content} />
                    </div>
                ))}
                {/* {aarray !== "" && (
                    <div className='message-container'>
                        <AvatarComponent name="ERINE" avatarUrl={wenxin} />
                        <Markdown content={aarray} />
                    </div>
                )} */}
            </div>


            <div>{responseText}</div>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="请输入内容..."
                className="block w-full rounded-md border-0 bg-zinc-100 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 sm:text-sm sm:leading-6"
            />
            <button onClick={sendDataToBackend} className='inputbutton'>发送数据</button>
            <button onClick={clearData} className='inputbutton1'>清除历史</button>
        </div>
    );
}

export default App;

