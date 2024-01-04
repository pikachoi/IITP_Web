import pandas as pd
from pytorch_tabnet.tab_model import TabNetClassifier
from sklearn.metrics import f1_score, precision_score, recall_score, confusion_matrix

# 데이터 로드
df = pd.read_csv("merge_data_2.csv")

# NaN 값 처리 (여기서는 평균값으로 대체)
df.fillna(df.mean(), inplace=True)

# "Proto", "State" 등의 범주형 데이터를 원핫 인코딩
df = pd.get_dummies(df, columns=["Proto", "State"])

# 불필요한 컬럼 제거
df = df.drop(columns=['StartTime','SrcAddr', 'Dir', 'DstAddr'])

# 목표 변수와 특징 변수 분리
x = df.drop('Label', axis=1)
y = df['Label']

# TabNet 모델 초기화
model = TabNetClassifier()

# 저장된 가중치를 로드
model.load_model("ICE_Tapnet.h5.zip")

# 각 행에 대한 예측 및 결과 출력
for index, row in x.iterrows():
    # 행 단위로 모델에 입력
    row = row.values.reshape(1, -1)  # 모델에 입력하기 위해 행 벡터를 2D 배열로 변환
    y_pred = model.predict(row)

    # 결과가 'normal'이 아닌 경우에만 1을 출력
    if y_pred[0] != 'normal':
        print(1)
    else:
        print(0)
