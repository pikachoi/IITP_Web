import json
from random import randint
from asyncio import sleep
from channels.generic.websocket import AsyncWebsocketConsumer
import datetime
import struct
import socket
import multiprocessing as mp
import datetime
import random 
import csv
import pandas as pd
from pytorch_tabnet.tab_model import TabNetClassifier
import numpy as np

### Arkime Meta data ###
# class LineGraphConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
        
#         with open('D:\LT4\IITP\dashboard\graphs\sessions-.csv', mode='r', encoding='utf-8') as csv_file:
#             csv_reader = csv.DictReader(csv_file)
#             for row in csv_reader:

#                 def none(value):
#                     return "- Null -" if value is '' else value
                
#                 label = 0 if random.random() < 0.8 else 1

#                 data = {
#                     'start_time': none(row['Start Time']),
#                     'stop_time': none(row[' Stop Time']), 
#                     'src_ip': none(row[' Src IP']),
#                     'src_country': none(row[' Src Country']),
#                     'src_port': none(row[' Src Port']),
#                     'dst_ip': none(row[' Dst IP']),
#                     'dst_country': none(row[' Dst Country']),
#                     'dst_port': none(row[' Dst Port']),
#                     'packets': none(row[' Packets']),
#                     'data_bytes': none(row[' Data bytes']),
#                     'bytes': none(row[' Bytes']),
#                     'arkime_node': none(row[' Arkime Node']),
#                     'uri': none(row[' URI']),
#                     'sender': none(row[' Sender']),
#                     'receiver': none(row[' Receiver']),
#                     'subject': none(row[' Subject']),
#                     'filenames': none(row[' Filenames']),
#                     'host': none(row[' Host']),
#                     'alt_name': none(row[' Alt Name']),
#                     'channel': none(row[' Channel']),
#                     'label': none(label),
#                 }

#                 json_data = json.dumps(data)

#                 await self.send(json_data)
                
#                 await sleep(0.3)

import torch
import sklearn

print(f'numpy version : {np.__version__}')
print(f'torch version : {torch.__version__}')
print(f'sklearn version : {sklearn.__version__}')
print(f'CUDA 프로그래밍 가능여부 :  {torch.cuda.is_available()}')
print(f'CUDA 프로그래밍 가능여부 : {torch.cuda.get_device_name()}')
print(f'사용 가능 GPU 갯수 :  {torch.cuda.device_count()}')

class LineGraphConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        model = TabNetClassifier()
        model.load_model("data/ICE_Tapnet.h5.zip")

        with open('data/new_merge_data_2.csv', mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)

            for row in csv_reader:
                Dur = row['Dur']
                Proto_arp = row['Proto_arp']
                Proto_rtcp = row['Proto_rtcp']
                Proto_tcp = row['Proto_tcp']
                Proto_udp = row['Proto_udp']
                Sport = row['Sport']
                Dport = row['Dport']
                State_CON = row['State_CON']
                State_FIN = row['State_FIN']
                State_INT = row['State_INT']
                State_REQ = row['State_REQ']
                State_RSP = row['State_RSP']
                State_RST = row['State_RST']
                sTos = row['sTos']
                dTos = row['dTos']
                TotPkts = row['TotPkts']
                SrcPkts = row['SrcPkts']
                TotBytes = row['TotBytes']
                SrcBytes = row['SrcBytes']
                Load = row['Load']
                SrcLoad = row['SrcLoad']
                SIntPkt = row['SIntPkt']
                DIntPkt = row['DIntPkt']
           
                input_data = np.array([Dur, Proto_arp, Proto_rtcp, Proto_tcp, Proto_udp,
                       Sport, Dport, State_CON, State_FIN, State_INT,
                       State_REQ, State_RSP, State_RST, sTos, dTos,
                       TotPkts, SrcPkts, TotBytes, SrcBytes, Load,
                       SrcLoad, SIntPkt, DIntPkt], dtype=np.float32)
                
                y_pred = model.predict([input_data])
                value = str(y_pred[0])

                # if value == 'normal':
                #     label = 0
                # elif value == 'petya':
                #     label = 1
                # elif value == 'powerghost':
                #     label = 2
                # elif value == 'badrabbit':
                #     label = 3
                # elif value == 'wannacry':
                #     label = 4

                if random.random() < 0.90:
                    label = 0
                else:
                    # 1~4까지의 숫자 중에서 랜덤하게 선택
                    label = random.randint(-3, 3)

                data = {
                    'start_time': row['Dur'],
                    'stop_time': row['Proto_arp'],
                    'src_ip': row['State_REQ'],
                    'src_country': row['sTos'],
                    'src_port': row['dTos'],
                    'dst_ip': row['TotPkts'],
                    'dst_country': row['SrcPkts'],
                    'dst_port': row['TotBytes'],
                    'packets': row['SrcBytes'],
                    'data_bytes': row['Load'],
                    'bytes': row['SrcLoad'],
                    'label': label,
                }

                json_data = json.dumps(data)

                await self.send(json_data)
                
                await sleep(0.1)

#---------------------------------------------------------------------------------패킷 전송 시간은 네트워크의 성능과 관련된 중요한 정보를 제공
# Dur (Duration): 패킷 전송이 시작되고 끝난 사이의 시간.

#---------------------------------------------------------------------------------특정 서비스나 애플리케이션에 대한 트래픽을 식별하는데 유용
# Sport (Source Port): 패킷이 나가는(전송하는) 측의 포트 번호.
# Dport (Destination Port): 패킷이 들어가는(수신하는) 측의 포트 번호.

#---------------------------------------------------------------------------------네트워크 트래픽의 양을 나타내는 중요한 지표
# TotPkts (Total Packets): 패킷 송수신 사이 시간(Dur)동안 전송된 총 패킷 수.
# TotBytes (Total Bytes): 패킷 송수신 사이 시간(Dur)동안 전송된 총 바이트 수.

#---------------------------------------------------------------------------------TCP와 UDP 프로토콜 사용 여부는 네트워크 트래픽의 유형을 이해하는 데 도움
# Proto_tcp: TCP 프로토콜을 나타내는 바이너리 변수.
# Proto_udp: UDP 프로토콜을 나타내는 바이너리 변수.

#---------------------------------------------------------------------------------연결 상태는 네트워크 세션의 상태와 관련된 중요한 정보를 제공
# State_CON (Connection State - CON): 연결 상태가 'CON'인 경우.
# State_FIN (Connection State - FIN): 연결 상태가 'FIN'인 경우.
# State_INT (Connection State - INT): 연결 상태가 'INT'인 경우.
# State_REQ (Connection State - REQ): 연결 상태가 'REQ'인 경우.
# State_RSP (Connection State - RSP): 연결 상태가 'RSP'인 경우.
# State_RST (Connection State - RST): 연결 상태가 'RST'인 경우.

#---------------------------------------------------------------------------------비교적 덜 중요한 정보로 판단, 선별 제외
# sTos (Source Type of Service): 출발지의 서비스 유형.
# dTos (Destination Type of Service): 목적지의 서비스 유형.
# SrcPkts (Source Packets): 출발지에서 전송된 패킷 수.
# SrcBytes (Source Bytes): 출발지에서 전송된 바이트 수.
# Load: 네트워크 부하.
# SrcLoad: 출발지의 부하.
# SIntPkt (Source Interpacket Arrival Time): 출발지에서의 패킷 간 도착 시간.
# DIntPkt (Destination Interpacket Arrival Time): 목적지에서의 패킷 간 도착 시간.
# Proto_arp: ARP 프로토콜을 나타내는 바이너리 변수.
# Proto_rtcp: RTCP 프로토콜을 나타내는 바이너리 변수.




class LineGraphConsumer2(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        for i in range(1000):
           await self.send(json.dumps({'value': randint(-100, 100)}))
           await sleep(1)