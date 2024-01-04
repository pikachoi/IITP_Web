import pandas as pd
from pytorch_tabnet.tab_model import TabNetClassifier
import csv
import numpy as np

# TabNet 모델 초기화
model = TabNetClassifier()

# 저장된 가중치를 로드
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
                if y_pred[0]== 'wannacry':
              #   print(type(str(y_pred[0])))
                     print('~~~~~~~~~~~')


# petya, powerghost, badrabbit, normal, wannacry