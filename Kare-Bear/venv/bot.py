import discord
from discord.ext import commands
import json
import logging

logging.basicConfig(level=logging.INFO)

client = commands.Bot(command_prefix='.')

with open('C:/Users/kerry/PycharmProjects/Kare Bear/trainingData.json', 'r') as f:
    temp_data = json.load(f)
    training_data = temp_data[0]
    header = temp_data[1]


def class_counts(grid):
    """Counts the number of each type of gridRow in a dataset."""
    counts = {}  # a dictionary of label -> count.
    for row in grid:
        # in our dataset format, the label is always the last column
        label = row[-1]
        if label not in counts:
            counts[label] = 0
        counts[label] += 1
    return counts


class Question:
    """A Question is used to partition a dataset.

    This class just records a 'column number' (e.g., 0 for Color) and a
    'column value' (e.g., Green). The 'match' method is used to compare
    the feature value in an example to the feature value stored in the
    question. See the demo below.
    """

    def __init__(self, column, value):
        self.column = column
        self.value = value

    def match(self, example):
        # Compare the feature value in an example to the
        # feature value in this question.
        val = example[self.column]
        if val is None:
            return "None"
        elif val == self.value:
            return "True"
        else:
            return "False"

    def __repr__(self):
        # This is just a helper method to print
        # the question in a readable format.
        condition = "=="
        return "Is %s %s %s?" % (
            header[self.column], condition, str(self.value))


def partition(grid, question):
    """Partitions a dataset.

    For each row in the dataset, check if it matches the question. If
    so, add it to 'true rows', otherwise, add it to 'false rows'.
    """
    true_rows, false_rows = [], []
    for gridRow in grid:
        if question.match(gridRow) is "True":
            true_rows.append(gridRow)
        elif question.match(gridRow) is "False":
            false_rows.append(gridRow)
        else:
            print('THERE IS A MISSING VALUE IN TRAINING DATA')
    return true_rows, false_rows


def gini(grid):
    """Calculate the Gini Impurity for a list of rows.

    There are a few different ways to do this, I thought this one was
    the most concise. See:
    https://en.wikipedia.org/wiki/Decision_tree_learning#Gini_impurity
    """
    counts = class_counts(grid)
    impurity = 1
    for lbl in counts:
        prob_of_lbl = counts[lbl] / float(len(grid))
        impurity -= prob_of_lbl ** 2
    return impurity


def info_gain(left, right, current_uncertainty):
    """Information Gain.

    The uncertainty of the starting node, minus the weighted impurity of
    two child nodes.
    """
    p = float(len(left)) / (len(left) + len(right))
    return current_uncertainty - p * gini(left) - (1 - p) * gini(right)


def find_best_split(grid):
    """Find the best question to ask by iterating over every feature / value
    and calculating the information gain."""
    best_gain = 0  # keep track of the best information gain
    best_question = None  # keep train of the feature / value that produced it
    current_uncertainty = gini(grid)
    n_features = len(grid[0]) - 1  # number of columns

    for col in range(n_features):  # for each feature

        values = set([row[col] for row in grid])  # unique values in the column

        for val in values:  # for each value

            question = Question(col, val)

            # try splitting the dataset
            true_rows, false_rows = partition(grid, question)

            # Skip this split if it doesn't divide the
            # dataset.
            if len(true_rows) == 0 or len(false_rows) == 0:
                continue

            # Calculate the information gain from this split
            gain = info_gain(true_rows, false_rows, current_uncertainty)

            # You actually can use '>' instead of '>=' here
            # but I wanted the tree to look a certain way for our
            # toy dataset.
            if gain >= best_gain:
                best_gain, best_question = gain, question

    return best_gain, best_question


class Leaf:
    """A Leaf node classifies data.

    This holds a dictionary of class (e.g., "Apple") -> number of times
    it appears in the rows from the training data that reach this leaf.
    """

    def __init__(self, grid):
        self.predictions = class_counts(grid)


class Decision_Node:
    """A Decision Node asks a question.

    This holds a reference to the question, and to the two child nodes.
    """

    def __init__(self,
                 question,
                 true_branch,
                 false_branch):
        self.question = question
        self.true_branch = true_branch
        self.false_branch = false_branch


def build_tree(rows):
    """Builds the tree.

    Rules of recursion: 1) Believe that it works. 2) Start by checking
    for the base case (no further information gain). 3) Prepare for
    giant stack traces.
    """

    # Try partitioing the dataset on each of the unique attribute,
    # calculate the information gain,
    # and return the question that produces the highest gain.
    gain, question = find_best_split(rows)

    # Base case: no further info gain
    # Since we can ask no further questions,
    # we'll return a leaf.
    if gain == 0:
        return Leaf(rows)

    # If we reach here, we have found a useful feature / value
    # to partition on.
    true_rows, false_rows = partition(rows, question)

    # Recursively build the true branch.
    true_branch = build_tree(true_rows)

    # Recursively build the false branch.
    false_branch = build_tree(false_rows)

    # Return a Question node.
    # This records the best feature / value to ask at this point,
    # as well as the branches to follow
    # dependingo on the answer.
    return Decision_Node(question, true_branch, false_branch)


def print_tree(node, spacing=""):
    """World's most elegant tree printing function."""

    # Base case: we've reached a leaf
    if isinstance(node, Leaf):
        print(spacing + "Predict", node.predictions)
        return

    # Print the question at this node
    print(spacing + str(node.question))

    # Call this function recursively on the true branch
    print(spacing + '--> True:')
    print_tree(node.true_branch, spacing + "  ")

    # Call this function recursively on the false branch
    print(spacing + '--> False:')
    print_tree(node.false_branch, spacing + "  ")


my_tree = build_tree(training_data)
print_tree(my_tree)


def classify(row, node):
    """See the 'rules of recursion' above."""
    print('classify: ')
    # Base case: we've reached a leaf
    if isinstance(node, Leaf):
        return node.predictions

    # Decide whether to follow the true-branch or the false-branch.
    # Compare the feature / value stored in the node,
    # to the example we're considering.
    print(node.question)
    if node.question.match(row) == "True":
        print('Yes')
        return classify(row, node.true_branch)
    elif node.question.match(row) == "False":
        print('No')
        return classify(row, node.false_branch)
    else:
        print('Neither')
        if classify(row, node.true_branch) == classify(row, node.false_branch):
            return classify(row, node.true_branch)
        else:
            return {'Need more information': 1}


def print_leaf(counts):
    """A nicer way to print the predictions at a leaf."""
    total = sum(counts.values()) * 1.0
    probs = {}
    for lbl in counts.keys():
        probs[lbl] = str(int(counts[lbl] / total * 100)) + "%"
    return probs


data = [
    "Yes",
    "Yes",
    "Yes"
]
print(print_leaf(classify(data, my_tree)))


def save_user_data(user_id, user_info):
    with open('userData.json') as f:
        data = json.load(f)
        del data[user_id]
        data[user_id] = user_info
        json.dump(data, f, indent=2)


def new_user_info():
    return {'Computer on?': None, "Fans spinning?": None}


def save_user_data(user_id, user_info):
    with open('C:/Users/kerry/PycharmProjects/KareBear/userData.json') as f:
        data = json.load(f)
        del data[user_id]
        data[user_id] = user_info
        json.dump(data, f, indent=2)


def get_user_data(user_id):
    with open('C:/Users/kerry/PycharmProjects/KareBear/userData.json', 'r+') as f:
        data = json.load(f)
        print('OG DATA')
        print(data)
        print('user id type', type(user_id))

        print(str(user_id) in data)

        if user_id in data:
            data = json.load(f)
            return data[user_id]
        else:
            user_info = new_user_info()
            data[user_id] = user_info
            print('NEW DATA')
            print(data)
            # json.dump(data, f, indent=2)
            return user_info


@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))


@client.event
async def on_member_join(member):
    print(f'{member} has joined a server.')


@client.event
async def on_member_remove(member):
    print(f'{member} has left a server.')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!help'):
        user_info = get_user_data(message.author.id)
        await message.channel.send(user_info)


client.run('NTc5MTQ1MDg1ODUwMDkxNTIw.Xtzb2w.GwB4m9oyX0dox90qUGhbpyxVCdo')
