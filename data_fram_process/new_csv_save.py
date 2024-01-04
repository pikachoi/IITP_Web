import pandas as pd

# 데이터 로드
df = pd.read_csv('data/merge_data_2.csv')

# NaN 값 처리 (여기서는 평균값으로 대체)
df.fillna(df.mean(), inplace=True)

# "Proto", "State" 등의 범주형 데이터를 원핫 인코딩
df = pd.get_dummies(df, columns=["Proto", "State"])

# 불필요한 컬럼 제거
df = df.drop(columns=['StartTime','SrcAddr', 'Dir', 'DstAddr', 'Label'])

df.to_csv('data/new_merge_data_2.csv')
