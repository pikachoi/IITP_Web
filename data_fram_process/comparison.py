import pandas as pd

# 같은 행을 가지는 두 csv파일을 똑같이 만듦
def remove_mismatched_rows():
    merge_data_2 = pd.read_csv('a.csv')
    test_data = pd.read_csv('b.csv')
    result = merge_data_2.merge(test_data, how='inner')  # a에서 b와 일치하는 행만 남기고 제거
    result.to_csv('ddd.csv', index=False)


# csv 특정 컬럼이 가지는 클래스들 비율을 맞춤
def class_ratio_control():
    file_path = "label_merge_data_2.csv"
    data = pd.read_csv(file_path)

    # Label 컬럼 값들의 비율 확인   
    label_counts = data['Label'].value_counts()

    # 모든 클래스를 가장 작은 샘플 수에 맞춤 (초과하는 행 제거)
    min_samples = label_counts.min()
    balanced_data = data.groupby('Label').apply(lambda x: x.sample(min_samples)).reset_index(drop=True)

    # 데이터를 랜덤 섞기
    balanced_data = balanced_data.sample(frac=1).reset_index(drop=True)

    balanced_data.to_csv("balanced_label_merge_data_2.csv", index=False)


# 두 csv 비교
def csv_comparison():
    df_train = pd.read_csv("merge_data_2.csv")
    df_test = pd.read_csv("test_data.csv")

    # 1. 열 이름 확인
    if list(df_train.columns) == list(df_test.columns):
        print("열 이름이 일치합니다.")
    else:
        print("열 이름이 불일치합니다.")

    # 2. 데이터 타입 확인
    if df_train.dtypes.equals(df_test.dtypes):
        print("데이터 타입이 일치합니다.")
    else:
        print("데이터 타입이 불일치합니다.")

    # 3. NaN 값 확인
    if df_train.isnull().sum().equals(df_test.isnull().sum()):
        print("NaN 값 처리가 일치합니다.")
    else:
        print("NaN 값 처리가 불일치합니다.")

    # 5. 모델의 입력 차원 확인
    if df_train.shape[1] == df_test.shape[1]:
        print("모델의 입력 차원이 일치합니다.")
    else:
        print("모델의 입력 차원이 불일치합니다.")

