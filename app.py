# app.py
import json
from flask import Flask, Response, jsonify, request
from flask import Flask, render_template
import os
import warnings
warnings.filterwarnings('ignore')
from langchain_community.chat_models import QianfanChatEndpoint
from langchain_core.language_models.chat_models import HumanMessage,AIMessage


os.environ["QIANFAN_AK"] = 'dkG5dq8FgEjCHOqGkIZM7fgC'
os.environ["QIANFAN_SK"] = '8Yu4iJyZJIEiJw7D3oZ3dRPFvngG7k3J'

app = Flask(__name__)

@app.route('/api/counter', methods=['POST'])  
def update_counter():  
    data = request.json  
    history = data.get('history', '')  
    messages = []
    for index,item in enumerate(history):
        if index%2 == 0:
            messages.append(HumanMessage(content=item['content']))
        else:
            messages.append(AIMessage(content=item['content']))
    content = data.get('content', '')  
    model = data.get('model', '')
    if model == '' or model == "未选择, 默认ERNIE-Lite-8K-0922(免费)":
        print("没有模型")
        chat = QianfanChatEndpoint(streaming=True, model='ERNIE-Lite-8K-0922')
    else:
        print(model)
        chat = QianfanChatEndpoint(streaming=True, model=model)
    messages.append(HumanMessage(content=content))

    def generate():
        for chunk in chat.stream(messages):
            yield chunk.content
    return Response(generate(), content_type='text/plain')

@app.route('/')
def index():
    return render_template('index.html')  # 渲染打包好的React App的页面

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)

