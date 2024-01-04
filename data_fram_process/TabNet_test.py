import pandas as pd
from sklearn.preprocessing import LabelEncoder
from pytorch_tabnet.tab_model import TabNetClassifier
from sklearn.metrics import f1_score, precision_score, recall_score, confusion_matrix
from sklearn.model_selection import train_test_split

# 데이터 로드
df = pd.read_csv('C:\SRC\IITP\OpenICE\DATA\merge_data_2.csv')

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
model.load_model('C:\SRC\IITP\OpenICE\RESULT\ICE_Tapnet.h5.zip')

# 테스트 데이터에 대한 예측
y_pred = model.predict(x.values)

# F1 점수 계산
f1 = f1_score(y, y_pred, average='weighted')
print(f'Weighted F1 Score: {f1:.2f}')

# 각 클래스별 precision과 recall 계산
precision = precision_score(y, y_pred, average=None)
recall = recall_score(y, y_pred, average=None)

# Confusion Matrix 출력
conf_matrix = confusion_matrix(y, y_pred)
print('Confusion Matrix:')
print(conf_matrix)

# 각 클래스별 precision과 recall 출력
for i, (prec, rec) in enumerate(zip(precision, recall)):
    print(f'Class {i} - Precision: {prec:.2f}, Recall: {rec:.2f}')
