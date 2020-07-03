import io
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


cvg_cartoon_map = {
    '_': 0,
    '.': 0.25,
    'o': 0.5,
    'O': 1
}


def get_cartoon_heatmap(summary):
    cvg_grid_data = [[cvg_cartoon_map[symbol] for symbol in family['cvg']] for family in summary['families']]
    fig, ax = plt.subplots()
    im = ax.imshow(cvg_grid_data, cmap=plt.get_cmap('OrRd'))
    ax.set_yticks(np.arange(len(summary['families'])))
    ax.set_yticklabels([f['family'] for f in summary['families']])
    plt.tight_layout()
    plt.title(summary['properties']['sra'])
    return fig


def get_png_bytes(fig):
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return output
